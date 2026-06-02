import os
from pathlib import Path
from elevenlabs.client import ElevenLabs

BACKGROUND_AUDIO_DIR = Path(os.environ['BACKGROUND_AUDIO_DIR'])
NARRATOR_AUDIO_DIR = Path(os.environ['NARRATOR_AUDIO_DIR'])

class ElevenLabsApi:
    def __init__(self):
        api_key = os.environ.get('ELEVEN_LABS_KEY', '')
        if not api_key:
            raise ValueError("ElevenLabs API key is missing. Please provide a value for ELEVEN_LABS_KEY.")
        self.elevenLabs = ElevenLabs(api_key=api_key)
        self.model_id = os.environ['ELEVEN_LABS_MODEL']
    
    def writeFile(self, dir, fileName, data):
        with open(dir / fileName, "wb") as f:
            for chunk in data:
                f.write(chunk)


    def generateBackgroundMusic(self, givenPrompt):
        audio = self.elevenLabs.music.compose(
            prompt=givenPrompt,
            music_length_ms=15000
        )

        fileName = "background_audio.mp3"

        self.writeFile(BACKGROUND_AUDIO_DIR, fileName, audio)

        return BACKGROUND_AUDIO_DIR/fileName


    def generateNarratorVoice(self, script):
        audio = self.elevenLabs.text_to_speech.convert(
            text=script,
            voice_id='keLVje3aBMuRpxuu0bqO',
            model_id=self.model_id,
            output_format="mp3_44100_128",
        )

        fileName = "narrator_audio.mp3"

        self.writeFile(NARRATOR_AUDIO_DIR, fileName, audio)

        return NARRATOR_AUDIO_DIR/fileName