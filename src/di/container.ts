import { WeatherContoller } from "@/controllers/WeatherContoller";
import { OpenWeather } from "@/integration/open-weather/OpenWeather";
import { WeatherService } from "@/services/WeatherService";
import { Container } from "inversify";

const container = new Container();

//Integrations
container.bind<OpenWeather>(OpenWeather).toSelf();

//Services
container.bind<WeatherService>(WeatherService).toSelf();

// //Controllers
// container.bind<WeatherContoller>(WeatherContoller).toSelf();

export { container };
