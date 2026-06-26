import React from 'react';

const HistoriaSeccion = ({ historiaRef }) => {
    return (
        <section 
            ref={historiaRef} 
            style={styles.seccion}
        >
            <div style={styles.contenedor}>
                <div style={styles.columnaTexto}>
                    <span style={styles.subtitulo}>NUESTRAS RAÍCES</span>
                    <h2 style={styles.titulo}>Una historia forjada entre viñedos y cordillera</h2>
                    <p style={styles.parrafo}>
                        Fundada en 1924 por Don Amadeo Maipú, un inmigrante apasionado que vio en las tierras altas de Mendoza 
                        el escenario perfecto para su sueño, nuestra bodega comenzó con apenas tres hectáreas de suelo pedregoso 
                        y una promesa: respetar el ritmo de la naturaleza.
                    </p>
                    <p style={styles.parrafo}>
                        A lo largo de cuatro generaciones, combinamos los secretos ancestrales de la crianza en roble con la precisión 
                        de la enología moderna. Hoy, cada botella que sale de nuestra cava es un homenaje al sol mendocino, al agua pura 
                        de deshielo y al esfuerzo inquebrantable de nuestra gente.
                    </p>
                </div>
                
                <div style={styles.columnaImagen}>
                    {/* Un contenedor estético simulando un viñedo antiguo */}
                    <div style={styles.cuadroEstetico}>
                        <div style={styles.lineasDecorativas}>
                            <span style={styles.año}>1924</span>
                            <p style={styles.pieAño}>Mendoza, Arg.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const styles = {
    seccion: { padding: '100px 20px', backgroundColor: '#f9f6f0', display: 'flex', justifyContent: 'center', alignItems: 'center' },
    contenedor: { width: '100%', maxWidth: '1200px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' },
    columnaTexto: { display: 'flex', flexDirection: 'column', gap: '20px' },
    subtitulo: { fontSize: '11px', fontWeight: '600', letterSpacing: '3px', color: '#722f37' },
    titulo: { fontFamily: '"Playfair Display", serif', fontSize: '36px', color: '#1a1a1a', margin: 0, lineHeight: '1.2' },
    parrafo: { fontFamily: '"Inter", sans-serif', fontSize: '15px', color: '#555', lineHeight: '1.7', margin: 0 },
    columnaImagen: { display: 'flex', justifyContent: 'center' },
    cuadroEstetico: { width: '100%', height: '350px', backgroundColor: '#1e1415', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', position: 'relative' },
    lineasDecorativas: { border: '1px solid rgba(255,255,255,0.15)', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
    año: { fontFamily: '"Playfair Display", serif', fontSize: '64px', color: '#f9f6f0', fontWeight: 'bold', letterSpacing: '2px' },
    pieAño: { color: 'rgba(255,255,255,0.5)', fontSize: '12px', letterSpacing: '2px', margin: '5px 0 0 0', textTransform: 'uppercase' }
};

export default HistoriaSeccion;