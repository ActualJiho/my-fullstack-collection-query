import { getPlates } from '../apis/plates'
import { useQuery } from '@tanstack/react-query'
import { PlateModel } from '../models/plates'
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
  const { data: carData, isError, isLoading } = useQuery(['plate'], getPlates)

  if (isError) {
    return <div>ERROR</div>
  }

  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <>
      <header className="header">
        <h1>Personalised Plates</h1>
      </header>
      <section className="main">
        <ul>
          {carData.map((car) => (
            <DeleteCar
              key={car.id}
              id={car.id}
              location={car.location}
              plate={car.plate}
            />
          ))}
        </ul>
        <AddCarForm />
      </section>
    </>
  )
}

export default App
