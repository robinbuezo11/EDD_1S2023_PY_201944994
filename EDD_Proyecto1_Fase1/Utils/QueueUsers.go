package Utils

import "fmt"

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
