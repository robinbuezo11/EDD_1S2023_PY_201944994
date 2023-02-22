package Utils

import "fmt"

func Login() {

	admin := User{firstname: "admin", pass: "admin"}

	option := 0

	for option != 2 {
		fmt.Println("**************** EDD GoDrive ****************")
		fmt.Println("*            1. Iniciar Sesion              *")
		fmt.Println("*           2. Salir del Sistema            *")
		fmt.Println("**************** EDD GoDrive ****************")
		fmt.Println("\nElige una opcion: ")

		fmt.Scan(&option)

		if option == 1 {

			user := ""
			fmt.Println("\nIngresa tu usuario: ")
			fmt.Scan(&user)
			pass := ""
			fmt.Println("\nIngresa tu password: ")
			fmt.Scan(&pass)

			if user == admin.firstname && pass == admin.pass {
				for option != 5 {
					fmt.Println("*** Dashboard Administrador - EDD GoDrive ***")
					fmt.Println("*      1. Ver estudiantes Pendientes        *")
					fmt.Println("*      2. Ver estudiantes del Sistema       *")
					fmt.Println("*      3. Registrar Nuevo Estudiante        *")
					fmt.Println("*      4. Carga Masiva de Estudiantes       *")
					fmt.Println("*      5. Cerrar Sesion                     *")
					fmt.Println("*********************************************")
					fmt.Println("\nElige una opcion: ")

					fmt.Scan(&option)
				}
			}
		}
	}

}
