import { getPlates } from '../apis/plates'
import { useQuery } from '@tanstack/react-query'
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
    <div className="bg-sky-950 text-neutral-100">
      <header className="text-center font-light text-5xl">
        <h1 className="py-8">🚙 Personalised Plates 🚗</h1>
      </header>
      <AddCarForm />
      <section className="flex flex-col gap-8 p-20">
        <ul className="text-center m-auto">
          {carData.map((car) => (
            <DeleteCar
              key={car.id}
              id={car.id}
              location={car.location}
              plate={car.plate}
            />
          ))}
        </ul>
      </section>
    </div>
  )
}

export default App
