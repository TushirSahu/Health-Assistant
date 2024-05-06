from gtts import gTTS 
import os 
from englisttohindi.englisttohindi import EngtoHindi
import psutil

def engToHindi(mytext,language):    
  res = EngtoHindi(mytext)
  mytext = res.convert
  myobj = gTTS(text=mytext, lang=language, slow=True)
  myobj.save("test.wav") 
  return