package Utils

import "fmt"

type NodeAction struct {
	action string
	time   string
	Next   *NodeAction
}

func (node *NodeAction) Print() {
	fmt.Println("---------------------------------------------")
	fmt.Printf("%s %s\n", node.action, node.time)
}
