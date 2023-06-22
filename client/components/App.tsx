import { getCars } from '../apis/cars'
import { useQuery } from '@tanstack/react-query'
import { CarModel } from '../models/cars'
import DeleteCar from './DeleteCar'
import AddCarForm from './AddCarForm'

function App() {
  //useEffect -- for practise
  // const [carData, setCarData] = useState<CarModel[]>([])
  // useEffect(() => {
  //   async function fetchCar() {
  //     try {
  //       const fetchedCar = await getCars()
  //       setCarData(fetchedCar)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   fetchCar()
  // }, [])

  //useQeury
  const { data: carData, isError, isLoading } = useQuery(['car'], getCars)

  if (isError) {
    return <div>ERROR</div>
  }

  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <>
      <header className="header">
        <h1>My Cars</h1>
      </header>
      <section className="main">
        <ul>
          {carData.map((car) => (
            <DeleteCar key={car.id} id={car.id} name={car.name} />
          ))}
        </ul>
        <AddCarForm />
      </section>
    </>
  )
}

export default App
