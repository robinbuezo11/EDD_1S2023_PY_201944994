package Utils

import (
	"fmt"
	"log"
	"strconv"
	"strings"
)

func Login() {

	admin := User{Firstname: "admin", Pass: "admin"}
	queue := QueueUsers{first: nil, Size: 0}
	douList := DouListUsers{first: nil, last: nil}

	option := 0

	for option != 2 { // MENU PRINCIPAL
		fmt.Println("\n**************** EDD GoDrive ****************")
		fmt.Println("*            1. Iniciar Sesion              *")
		fmt.Println("*           2. Salir del Sistema            *")
		fmt.Println("**************** EDD GoDrive ****************")
		fmt.Print("Elige una opcion: ")

		fmt.Scan(&option)

		if option == 1 {

			user := ""
			fmt.Print("\nIngresa tu usuario: ") //Numero de carnet
			fmt.Scan(&user)
			pass := ""
			fmt.Print("Ingresa tu password: ")
			fmt.Scan(&pass)

			if user == admin.Firstname && pass == admin.Pass { // Si es admin
				for option != 5 {
					fmt.Println("\n*** Dashboard Administrador - EDD GoDrive ***")
					fmt.Println("*      1. Ver estudiantes Pendientes        *")
					fmt.Println("*      2. Ver estudiantes del Sistema       *")
					fmt.Println("*      3. Registrar Nuevo Estudiante        *")
					fmt.Println("*      4. Carga Masiva de Estudiantes       *")
					fmt.Println("*      5. Cerrar Sesion                     *")
					fmt.Println("*********************************************")
					fmt.Print("Elige una opcion: ")

					fmt.Scan(&option)

					switch option {
					case 1:
						fmt.Println("\n********** Estudiantes Pendientes ***********")
						for option != 3 {
							queue.PrintToDecide() // Ver estudiantes pendientes
							fmt.Println("*      1. Aceptar al Estudiante             *")
							fmt.Println("*      2. Rechazar al Estudiante            *")
							fmt.Println("*      3. Volver al Menu                    *")
							fmt.Print("Elige una opcion: ")

							fmt.Scan(&option)

							switch option {
							case 1: // Aceptar al Estudiante
								if queue.Size > 0 {
									user := queue.Dequeue()
									douList.AddUser(user)
								}
							case 2: // Aceptar al Estudiante
								if queue.Size > 0 {
									queue.Dequeue()
								}
							}
							fmt.Println()
						}
					case 2: // Ver Estudiantes del Sistema
						fmt.Println("\n********** Listado de Estudiantes ***********")
						douList.Print()
					case 3: // Registrar nuevo estudiante
						fmt.Println("\n*** Registro de Estudiantes - EDD GoDrive ***")
						var name, lastname, pass string
						var carnet int
						fmt.Print("Ingresa el Nombre: ")
						fmt.Scan(&name)
						fmt.Print("Ingresa el Apellido: ")
						fmt.Scan(&lastname)
						fmt.Print("Ingresa el Carnet: ")
						fmt.Scan(&carnet)
						fmt.Print("Ingresa el Password: ")
						fmt.Scan(&pass)

						queue.Enqueue(&User{Firstname: name, Lastname: lastname, Carnet: carnet, Pass: pass}) //Agregar a la cola de estudiantes pendientes de aceptar
					case 4: // Carga Masiva de Estudiantes
						var path string
						fmt.Println("\n********** Listado de Estudiantes ***********")
						fmt.Println("\n*********** Carga de Estudiantes ************")
						fmt.Print("Ingresa la ruta del archivo CSV: ")
						fmt.Scan(&path)
						data := ReadCVSFile(path)

						for index, row := range data {
							if index > 0 {
								names := strings.Split(row[1], " ")
								carnet, err := strconv.Atoi(row[0])
								if err != nil {
									log.Fatal("Error al leer el carnet "+path, err)
								}
								if len(names) > 1 {
									//fmt.Printf("Carnet: %d\tNombre: %s\tApellido: %s, Pass: %s\n", carnet, names[0], names[1], row[2])
									queue.Enqueue(&User{Firstname: names[0], Lastname: names[1], Carnet: carnet, Pass: row[2]}) //Agregar a la cola de estudiantes pendientes de aceptar
								} else {
									//fmt.Printf("Carnet: %d\tNombre: %s, Pass: %s\n", carnet, names[0], row[2])
									queue.Enqueue(&User{Firstname: names[0], Carnet: carnet, Pass: row[2]}) //Agregar a la cola de estudiantes pendientes de aceptar
								}

							}
						}
						fmt.Println("\n¡Archivo cargado exitosamente!")
					}
				}
			}
		}
	}

}
