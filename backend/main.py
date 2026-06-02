import json
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
import os

load_dotenv(Path(__file__).parent / '.env')

import ad_generator

with open(Path(__file__).parent.parent / "data" / "exampleBrands.json") as f:
    brands = json.load(f)

app = FastAPI()

app.mount("/frontend", StaticFiles(directory=os.environ.get('FRONTEND_DIR', '')), name="frontend")

@app.get("/")
def index():
    return RedirectResponse(url="/frontend/pages/main.html")

@app.post('/api/generate-ad/{brand_id}')
def generateAdvertisement(brand_id: int):
    brand = next((b for b in brands if b["id"] == brand_id), None)
    if brand is None:
        return {"error": f"Brand {brand_id} not found"}

    try:
        with ThreadPoolExecutor() as executor:
            background_future = executor.submit(ad_generator.generateBackgroundAudio)
            narrator_future = executor.submit(ad_generator.generateNarratorAudio, brand)
            background_path = background_future.result()
            narrator_path = narrator_future.result()

        output_path = ad_generator.combineAudio(background_path, narrator_path)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return FileResponse(output_path, media_type="audio/mpeg", filename="advertisement_audio.mp3")
