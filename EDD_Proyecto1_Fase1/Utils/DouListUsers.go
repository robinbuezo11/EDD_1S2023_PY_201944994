package Utils

import "fmt"

type DouListUsers struct {
	first *NodeUser
	last  *NodeUser
}

func (list *DouListUsers) AddUser(user *User) {

	node := &NodeUser{User: user, Next: nil, Prev: nil}

	if list.first == nil {
		list.first = node
		list.last = node
		fmt.Println("\n¡Usuario agregado exitosamente!")
	} else {
		if list.first.User.Carnet == node.User.Carnet {
			fmt.Println("\nEl usuario ya existe en la lista")
			return
		} else if list.first.User.Carnet > node.User.Carnet {
			node.Next = list.first
			list.first.Prev = node
			list.first = node
			fmt.Println("\n¡Usuario agregado exitosamente!")
			return
		} else {
			nodeaux := list.first

			for nodeaux.Next != nil {
				if nodeaux.User.Carnet == node.User.Carnet {
					fmt.Println("\nEl usuario ya existe en la lista")
					return
				} else if nodeaux.Next.User.Carnet > node.User.Carnet {
					node.Next = nodeaux.Next
					node.Prev = nodeaux
					nodeaux.Next.Prev = node
					nodeaux.Next = node
					fmt.Println("\n¡Usuario agregado exitosamente!")
					return
				}
				nodeaux = nodeaux.Next
			}

			list.last.Next = node
			node.Prev = list.last
			list.last = node
			fmt.Println("\n¡Usuario agregado exitosamente!")
		}
	}

}

func (list *DouListUsers) Print() {

	if list.first == nil {
		fmt.Println("No hay ningun estudiante en el sistema")
		fmt.Println()
	} else {
		nodeaux := list.first
		for nodeaux != nil {
			nodeaux.User.print()
			nodeaux = nodeaux.Next
		}
	}
}
