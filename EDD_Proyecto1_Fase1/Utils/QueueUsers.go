package Utils

import (
	"fmt"
	"strconv"
)

type QueueUsers struct {
	first *NodeUser
	Size  int
}

func (queue *QueueUsers) Enqueue(user *User) {

	node := &NodeUser{User: user, Next: nil}

	if queue.first == nil {
		queue.first = node
		queue.Size = 1
		fmt.Println("\n¡Usuario agregado a la cola!")
	} else {
		nodeaux := queue.first

		for nodeaux.Next != nil {
			nodeaux = nodeaux.Next
		}

		nodeaux.Next = node
		queue.Size += 1
		fmt.Println("\n¡Usuario agregado a la cola!")
	}

}

func (queue *QueueUsers) Dequeue() *User {
	if queue.first == nil {
		return nil
	} else {
		node := queue.first
		queue.first = queue.first.Next
		queue.Size -= 1
		return node.User
	}
}

func (queue *QueueUsers) Print() {
	fmt.Printf("\n*************** Pendientes: %d ***************\n", queue.Size)
	nodeaux := queue.first

	for nodeaux != nil {
		nodeaux.User.print()
		nodeaux = nodeaux.Next
	}
}

func (queue *QueueUsers) PrintToDecide() {
	fmt.Printf("*************** Pendientes: %d ***************\n", queue.Size)
	nodeaux := queue.first
	if nodeaux != nil {
		fmt.Printf("* Estudiante Actual: %s %s\n", nodeaux.User.Firstname, nodeaux.User.Lastname)
	} else {
		fmt.Println("No hay ningun estudiante pendiente")
		fmt.Println()
	}
}

func (queue *QueueUsers) GraphCode() string {
	nodeaux := queue.first
	nodes := "Head [shape=circle];\nTail [shape=circle];\n"
	conn := "edge [dir=back]\nHead->"
	index := 0
	for nodeaux.Next != nil {
		nodes += "N" + strconv.Itoa(index) + "[label=\"" + strconv.Itoa(nodeaux.User.Carnet) + "\\n" + nodeaux.User.Firstname + " " + nodeaux.User.Lastname + "\"];\n"
		conn += "N" + strconv.Itoa(index) + "->"
		nodeaux = nodeaux.Next
		index++
	}
	nodes += "N" + strconv.Itoa(index) + "[label=\"" + strconv.Itoa(nodeaux.User.Carnet) + "\\n" + nodeaux.User.Firstname + " " + nodeaux.User.Lastname + "\"];\n"
	conn += "N" + strconv.Itoa(index) + "->Tail\n"

	return "digraph G {\n" +
		"node[shape=rectangle style=filled pencolor=\"#00000\" color=\"#3ADEFF\" fontname=\"Helvetica,Arial\"];\n" +
		"rankdir=LR;\n" +
		nodes +
		conn +
		"\n}"
}
