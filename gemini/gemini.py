from model import Model

model = Model()
print(model.getMedicine("OurPart ideass Colour.Titanium Dosage:Asdire Cefixime Tablets IP 100mg Store protectea temperature no Keep out of react CEFIX-100 -00 Each film coated tablet contains Cefixime IP(as Trihydrate) equivalent.to Anhydrous Cefixime Excipients...... M.L.JK/02116-1112 Marketed by CIPLA LTD 5020 Cipla House,Peninsula Business park Manufactured byZeiss Ganpatrao Kadam Marg,Lower Parel, Cipla Unit IIIGC,SIDCOPt Mumbai-400 013,INDIA jammu-184121(J&K) PY Colour:Titanium Di efiximealetsIPoomg Dosage:As directe Store protected ir temperature not CEFIX 100- eep out of reach"))
print(model.getMedicine("Paracetamol Tablets IP Dolo=650 sr-eseEach uncoated tablet contains:Paracetamo! IP 650 mg.Dosage: As directed by the Physician.Store in a dry & dark place,at a temperature not exceeding"))
print(model.getMedicine("Adenosine Injectionf 6mg/2mL ADENOL G shoe cott Exch el contains Sodum Chicride IP ear for Injections IP 9R Mested by the physia 38125C (77); excrin ug medcine unt of reach of chor"))
print(model.getMedicine("Mexohar Each hard gelatin capsule contains :Mexiletine Hydrochloride I.P.50 mg.Excipientsq.S.Approved colours used in empty capsule shells.Dosage: As prescribed by the physician.Store below 25°C.Protected from light and moisture.Keep the medicine out of reach of childrenMfd. by: Elation Pharma, Plot No. 76, Ind. Area, Vill. Lodhimajra, Baddi-173205 (HP)SCHEDULE H PRESCRIPTIONDRUG - CAUTIONNot to be sold by retail without the prescription of a Registered Medical Practitioner.For Sale in India Only Mfg. Lic No: L/18/2169/MNB"))

response = model.getMedicine("OurPart ideass Colour.Titanium Dosage:Asdire Cefixime Tablets IP 100mg Store protectea temperature no Keep out of react CEFIX-100 -00 Each film coated tablet contains Cefixime IP(as Trihydrate) equivalent.to Anhydrous Cefixime Excipients...... M.L.JK/02116-1112 Marketed by CIPLA LTD 5020 Cipla House,Peninsula Business park Manufactured byZeiss Ganpatrao Kadam Marg,Lower Parel, Cipla Unit IIIGC,SIDCOPt Mumbai-400 013,INDIA jammu-184121(J&K) PY Colour:Titanium Di efiximealetsIPoomg Dosage:As directe Store protected ir temperature not CEFIX 100- eep out of reach")

# Research
# Make sure to have not more than 2-3 words in the response
# Make sure to have the medicine name in the response the generalization of the medicine name and not the exact name
# Make sure to have the response in the format medicine:response