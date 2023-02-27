package Utils

import (
	"fmt"
	"strconv"
)

type DouListUsers struct {
	first *NodeUser
	last  *NodeUser
}

func (list *DouListUsers) AddUser(user *User) {

	node := &NodeUser{User: user, Next: nil, Prev: nil, Binnacle: &StackBinnacle{first: nil}}

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

func (list *DouListUsers) GetNodeStudent(carnet int) *NodeUser {
	if list.first == nil {
		return nil
	} else {
		nodeaux := list.first
		for nodeaux != nil {
			if carnet == nodeaux.User.Carnet {
				return nodeaux
			}
			nodeaux = nodeaux.Next
		}
		return nil
	}
}

func (list *DouListUsers) GraphCode() string {
	nodeaux := list.first
	nodes := ""
	conn := ""
	connB := ""
	index := 0
	for nodeaux.Next != nil {
		nodes += "N" + strconv.Itoa(index) + "[label=\"" + strconv.Itoa(nodeaux.User.Carnet) + "\\n" + nodeaux.User.Firstname + " " + nodeaux.User.Lastname + "\"];\n"
		nodes += "B" + strconv.Itoa(index) + nodeaux.Binnacle.GraphCode()
		conn += "N" + strconv.Itoa(index) + "->"
		connB += "\nN" + strconv.Itoa(index) + "-> B" + strconv.Itoa(index)
		nodeaux = nodeaux.Next
		index++
	}
	nodes += "N" + strconv.Itoa(index) + "[label=\"" + strconv.Itoa(nodeaux.User.Carnet) + "\\n" + nodeaux.User.Firstname + " " + nodeaux.User.Lastname + "\"];\n"
	nodes += "B" + strconv.Itoa(index) + nodeaux.Binnacle.GraphCode()
	conn += "N" + strconv.Itoa(index) + "\n"
	connB += "\nN" + strconv.Itoa(index) + "-> B" + strconv.Itoa(index)
	nodeaux = list.last
	for nodeaux.Prev != nil {
		conn += "N" + strconv.Itoa(index) + "->"
		nodeaux = nodeaux.Prev
		index--
	}
	conn += "N" + strconv.Itoa(index)

	return "digraph G {\n" +
		"node[shape=rectangle style=filled pencolor=\"#00000\" color=\"#3ADEFF\" fontname=\"Helvetica,Arial\"];\n" +
		"rankdir=LR;\n" +
		nodes +
		conn +
		connB +
		"\n}"
}
