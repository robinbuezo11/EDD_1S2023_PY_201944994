package Utils

import (
	"fmt"
	"time"
)

type StackBinnacle struct {
	first *NodeAction
}

func (stack *StackBinnacle) Push(msg string) {

	t := time.Now()
	time := fmt.Sprintf("%02d/%02d/%d %02d:%02d:%02d", t.Day(), t.Month(), t.Year(), t.Hour(), t.Minute(), t.Second())
	node := &NodeAction{action: msg, Next: nil, time: time}

	if stack.first == nil {
		stack.first = node
	} else {
		node.Next = stack.first
		stack.first = node
	}

}

func (stack *StackBinnacle) Print() {

	if stack.first == nil {
		fmt.Println("No hay ninguna accion registrada")
		fmt.Println()
	} else {
		nodeaux := stack.first
		for nodeaux != nil {
			nodeaux.Print()
			nodeaux = nodeaux.Next
		}
	}
}

func (stack *StackBinnacle) GraphCode() string {
	nodes := "[label=<<table cellspacing=\"0\">"
	if stack.first != nil {
		nodeaux := stack.first
		for nodeaux.Next != nil {
			nodes += "<tr><td>" + nodeaux.action + "<br/>" + nodeaux.time + "</td></tr>\n"
			nodeaux = nodeaux.Next
		}
		nodes += "<tr><td>" + nodeaux.action + "<br/>" + nodeaux.time + "</td></tr></table>>]\n"
	} else {
		nodes += "<tr><td>No hay registros</td></tr></table>>]\n"
	}

	return nodes
}
