import pandas as pd
import json
# Especifica la ruta de tu archivo CSV
file_path_csv = './drid_yt_links.csv'
# Lee el archivo CSV
df_csv = pd.read_csv(file_path_csv)

# Renombrar 'yt-url' a 'yt_url'
df_csv = df_csv.rename(columns={'yt-url': 'yt_url'})

# Especifica la ruta de tu archivo JSON
file_path_json = './merged_data.json'

# Lee el archivo JSON
df_json = pd.read_json(file_path_json)

df_combined = pd.merge(df_csv, df_json, on='name', how='outer', suffixes=('_csv', '_json'))

df_combined['yt_url'] = df_combined['yt_url'].fillna('')

df_combined.drop_duplicates(subset=None, keep='first', inplace=False)
# Convertir el DataFrame combinado a un array de diccionarios
result_array = df_combined.to_dict(orient='records')

# Guardar el array de diccionarios como un archivo JSON
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(result_array, f, ensure_ascii=False, indent=2)



