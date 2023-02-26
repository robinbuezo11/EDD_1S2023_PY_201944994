package Utils

import (
	"fmt"
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
		fmt.Println("Elige una opcion: ")

		fmt.Scan(&option)

		if option == 1 {

			user := ""
			fmt.Println("\nIngresa tu usuario: ")
			fmt.Scan(&user)
			pass := ""
			fmt.Println("\nIngresa tu password: ")
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
					fmt.Println("Elige una opcion: ")

					fmt.Scan(&option)

					switch option {
					case 1:
						fmt.Println("\n********** Estudiantes Pendientes ***********")
						for option != 3 {
							queue.PrintToDecide() // Ver estudiantes pendientes
							fmt.Println("*      1. Aceptar al Estudiante             *")
							fmt.Println("*      2. Rechazar al Estudiante            *")
							fmt.Println("*      3. Volver al Menu                    *")
							fmt.Println("Elige una opcion: ")

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
						fmt.Println("Ingresa el Nombre:")
						fmt.Scan(&name)
						fmt.Println("Ingresa el Apellido:")
						fmt.Scan(&lastname)
						fmt.Println("Ingresa el Carnet:")
						fmt.Scan(&carnet)
						fmt.Println("Ingresa el Password:")
						fmt.Scan(&pass)

						queue.Enqueue(&User{Firstname: name, Lastname: lastname, Carnet: int(carnet), Pass: pass}) //Agregar a la cola de estudiantes pendientes de aceptar
					case 4: // Carga Masiva de Estudiantes
						//
					}
				}
			}
		}
	}

}
