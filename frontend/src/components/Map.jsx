import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoidmVkYW50am43IiwiYSI6ImNreTlsaHVkYTA3aTEyeHBkYmo2N2o3NGwifQ.xJyZ3madB0y9BABOSacbxA';

const MapWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
`;

const Map = ({ selected }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/dark-v10',
        center: [0, 0],
        zoom: 2,
        fadeDuration: 1000,
        trackUsage: false
      });

      mapRef.current.on('load', () => {
        setMapLoaded(true);
        mapRef.current.resize();
      });

      mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !mapLoaded || !selected) return;

    const { lng, lat } = selected;

    mapRef.current.flyTo({
      center: [lng, lat],
      zoom: 14,
      speed: 0.8,
      curve: 1.4,
      easing: (t) => t * (2 - t), 
      essential: true
    });

    
    if (markerRef.current) {
      markerRef.current.remove();
    }

   
    markerRef.current = new mapboxgl.Marker({ color: '#61dafb' })
      .setLngLat([lng, lat])
      .addTo(mapRef.current);

    
    const markerElement = markerRef.current.getElement();
    markerElement.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    markerElement.style.transform = 'translateY(-50px)';
    setTimeout(() => {
      markerElement.style.transform = 'translateY(0)';
    }, 0);

  }, [selected, mapLoaded]);

  return (
    <MapWrapper
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
    </MapWrapper>
  );
};

export default Map;