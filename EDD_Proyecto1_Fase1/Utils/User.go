package Utils

import "fmt"

type User struct {
	Firstname string
	Lastname  string
	Carnet    int
	Pass      string
}

func (user *User) print() {
	fmt.Println("---------------------------------------------")
	fmt.Printf("Nombre: %s %s, Carnet: %d\n", user.Firstname, user.Lastname, user.Carnet)
}
