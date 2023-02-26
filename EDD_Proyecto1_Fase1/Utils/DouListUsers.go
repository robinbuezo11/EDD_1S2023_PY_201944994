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
	} else {
		list.last.Next = node
		node.Prev = list.last
		list.last = node
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
