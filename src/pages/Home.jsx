import Navbar from "../components/Navbar"
import hero from '../assets/hero.jpg'

function Home() {

  return (
    <>
      <Navbar />
      <div style={{
        backgroundImage: `url("${hero}")`,
        minHeight: '90.5vh',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}>

        <div style={{
          backdropFilter: 'blur(2px)',
          width: '100%',
          height: '90.5vh',
          backgroundColor: '#00000044',
          color: 'white',
          fontFamily: '"Roboto"',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h1 style={{ margin: '0', fontSize: '70px', textTransform: 'uppercase' }}>El mejor GYM</h1>
          <p style={{
            background: 'red',
            color: 'white',
            fontSize: '24px',
            padding: '4px 54px',
            margin: '0px',
          }}>Para sacar lo mejor de tí</p>
          <h2 style={{ margin: 'none' }}>ExtravaGym</h2>
        </div>

      </div >
    </>
  )
}

export default Home
