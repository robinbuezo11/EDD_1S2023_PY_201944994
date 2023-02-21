package Utils

import "fmt"

func Login() {

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
		}
	}

}
