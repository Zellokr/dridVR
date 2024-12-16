import json
import csv

# Cargar el archivo JSON
with open('./data.json', 'r') as f:
    datos = json.load(f)

# Abrir el archivo CSV en modo escritura
with open('data.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=datos[0].keys())
    writer.writeheader()
    writer.writerows(datos)