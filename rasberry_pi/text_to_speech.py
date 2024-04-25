from gtts import gTTS 
# import gemini
import os 
from englisttohindi.englisttohindi import EngtoHindi
import psutil

# mytext = 'OurPart ideass Colour.Titanium Dosage:Asdire Cefixime Tablets IP 100mg Store protectea temperature no Keep out of react CEFIX-100 -00 Each film coated tablet contains Cefixime IP(as Trihydrate) equivalent.to Anhydrous Cefixime Excipients...... M.L.JK/02116-1112 Marketed by CIPLA LTD 5020 Cipla House,Peninsula Business park Manufactured byZeiss Ganpatrao Kadam Marg,Lower Parel, Cipla Unit IIIGC,SIDCOPt Mumbai-400 013,INDIA jammu-184121(J&K) PY Colour:Titanium Di efiximealetsIPoomg Dosage:As directe Store protected ir temperature not CEFIX 100- eep out of reach'
mytext = "Brufen Tablet used to relieve pain, inflammation, headache, migraine, back pain, dental pain, swelling and stiffness in joints and muscles"
language = 'hi'

res = EngtoHindi(mytext)
mytext = res.convert
print(mytext)

myobj = gTTS(text=mytext, lang=language, slow=False) 
  
myobj.save("welcome1.wav") 

# os.system("start welcome1.wav") 
process = psutil.Process()
print(process.memory_info().rss)  # in bytes