import os
from pathlib import Path
from pydub import AudioSegment
from services import OpenAiApi, ElevenLabsApi

elevenLabs = ElevenLabsApi()
openApi = OpenAiApi()

def generateNarratorAudio(brand):
    narratorScript = openApi.generateScript(brand)
    return elevenLabs.generateNarratorVoice(narratorScript)

def generateBackgroundAudio():
    return elevenLabs.generateBackgroundMusic("background music for an advertisement")

def combineAudio(background_path, narrator_path):
    output_dir = Path(os.environ["OUTPUT_DIR"])
    output_dir.mkdir(parents=True, exist_ok=True)
    background = AudioSegment.from_mp3(background_path) - 10
    narrator = AudioSegment.from_mp3(narrator_path)
    output_path = output_dir / "advertisement_audio.mp3"
    background.overlay(narrator).export(output_path, format="mp3")
    return output_path
