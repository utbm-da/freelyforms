import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import Material from './Material';
import './leaflet.css';
import './styles.css';

class Home extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      materials: [
        {
          id: '1',
          type: 'Type 1',
          fields: [
            { name: 'Field 1', type: 'string', data: 'Data 1' },
            { name: 'Field 2', type: 'number', data: 42 },
          ],
          locations: [
            {
              x: 51.52,
              y: -0.09,
              radius: 10,
              address: 'Location 1 Address',
            },
            {
              x: 51.53,
              y: -0.09,
              radius: 10,
              address: 'Location 1 Address 2 ',
            },
          ],
        },
        {
          id: '2',
          type: 'Type 2',
          fields: [
            { name: 'Field 1', type: 'boolean', data: 'true' },
            { name: 'Field 2', type: 'string', data: 'Data 2' },
          ],
          locations: [
            {
              x: 51.52,
              y: -0.08,
              radius: 0,
              address: 'Location 2 Address',
            },
          ],
        },
        {
          id: '3',
          type: 'Type 3',
          fields: [
            { name: 'Field 1', type: 'string', data: 'Data 3' },
            { name: 'Field 2', type: 'number', data: 48 },
          ],
        },
      ],
    };
  }

  handleLocationChange = (
    materialId: string,
    locationIndex: number,
    newCoordinates: { x: number; y: number }
  ) => {
    this.setState((prevState) => {
      const updatedMaterials = prevState.materials.map((material) => {
        if (material.id === materialId && material.locations) {
          const updatedLocations = [...material.locations];
          updatedLocations[locationIndex] = {
            ...updatedLocations[locationIndex],
            ...newCoordinates,
          };

          return {
            ...material,
            locations: updatedLocations,
          };
        }

        return material;
      });

      return {
        materials: updatedMaterials,
      };
    });
  };

  render() {
    const blueIcon = new L.Icon({
      iconUrl: '/../../node_modules/leaflet/dist/images/marker-icon.png',
      shadowUrl: '/../..//node_modules/leaflet/dist/images/marker-shadow.png',
    });

    return (
      <div style={{ display: 'flex' }}>
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          style={{ height: '900px', width: '50%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {this.state.materials.map((material) =>
            material.locations &&
            material.locations.map((location, index) => (
              <Marker
                key={`${material.id}_${index}`}
                position={[location.x, location.y]}
                icon={blueIcon}
              >
                <Popup>ID : {material.id} 
                 <br></br>Location {index+1}</Popup>
              </Marker>
            ))
          )}
        </MapContainer>
        <div style={{ width: '50%' }}>
          {this.state.materials.map((material) => (
            <Material
              key={material.id}
              material={material}
              onLocationChange={(index, newCoordinates) =>
                this.handleLocationChange(material.id, index, newCoordinates)
              }
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
