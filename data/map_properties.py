import json

# it workie is a file found on github with the names but not the ids.  Parsing another file with the ids and putting them on props from it_workie
with open('it_workie.geojson', 'r') as countries_without_props:
    countries_without_props_data = countries_without_props.read()

with open('countries_without_geo.json', 'r') as countries_with_props:
    countries_with_props_data = countries_with_props.read()

# parse file
countries_without_props_json = json.loads(countries_without_props_data)
countries_with_props_json = json.loads(countries_with_props_data)


def flatten_properties(geo_obj):
    props = geo_obj['properties']
    props.update({'id': geo_obj['id']})
    return {'properties': props}

props = list(map(lambda x: flatten_properties(x), countries_with_props_json['objects']['countries']['geometries']))

country_dict = {}

# Lots of discrepancies.  This was tedious...
for country in props:
    if country['properties']['name'] == 'Fr. S. Antarctic Lands':
        country['properties']['name'] = 'French Southern and Antarctic Lands'
    if country['properties']['name'] == 'Bahamas':
        country['properties']['name'] = f"The {country['properties']['name']}"
    if country['properties']['name'] == 'Bosnia and Herz.':
        country['properties']['name'] = 'Bosnia and Herzegovina'
    if country['properties']['name'] == 'Central African Rep.':
        country['properties']['name'] = 'Central African Republic'
    if country['properties']['name'] == "Côte d'Ivoire":
        country['properties']['name'] = 'Ivory Coast'
    if country['properties']['name'] == 'Dem. Rep. Congo':
        country['properties']['name'] = 'Democratic Republic of the Congo'
    if country['properties']['name'] == 'Congo':
        country['properties']['name'] = 'Republic of the Congo'
    if country['properties']['name'] == 'N. Cyprus':
        country['properties']['name'] = 'Northern Cyprus'
    if country['properties']['name'] == 'Czech Rep.':
        country['properties']['name'] = 'Czech Republic'
    if country['properties']['name'] == 'Dominican Rep.':
        country['properties']['name'] = 'Dominican Republic'
    if country['properties']['name'] == 'Falkland Is.':
        country['properties']['name'] = 'Falkland Islands'
    if country['properties']['name'] == 'Guinea-Bissau':
        country['properties']['name'] = 'Guinea Bissau'
    if country['properties']['name'] == 'Eq. Guinea':
        country['properties']['name'] = 'Equatorial Guinea'
    if country['properties']['name'] == 'Korea':
        country['properties']['name'] = 'South Korea'
    if country['properties']['name'] == 'Dem. Rep. Korea':
        country['properties']['name'] = 'North Korea'
    if country['properties']['name'] == 'Lao PDR':
        country['properties']['name'] = 'Laos'
    if country['properties']['name'] == 'W. Sahara':
        country['properties']['name'] = 'Western Sahara'
    if country['properties']['name'] == 'S. Sudan':
        country['properties']['name'] = 'South Sudan'
    if country['properties']['name'] == 'Solomon Is.':
        country['properties']['name'] = 'Solomon Islands'
    if country['properties']['name'] == 'Timor-Leste':
        country['properties']['name'] = 'East Timor'

    country_dict[country['properties']['name']] = country['properties']['id']

country_dict['Antarctica'] = 'ATA'
country_dict['West Bank'] = 'WB'

for i, feature in enumerate(countries_without_props_json['features']):
    print(feature['properties'])
    if feature['properties']['name'] == 'England':
        feature['properties']['name'] = 'United Kingdom'
    if feature['properties']['name'] == 'Republic of Serbia':
        feature['properties']['name'] = 'Serbia'
    if feature['properties']['name'] == 'United Republic of Tanzania':
        feature['properties']['name'] = 'Tanzania'
    if feature['properties']['name'] == 'USA':
        feature['properties']['name'] = 'United States'
    feature['properties'].update({'id': country_dict[feature['properties']['name']]})

with open('countries_with_props.geojson', 'w') as file:
    file.write(json.dumps(countries_without_props_json))  # use `json.loads` to do the reverse
