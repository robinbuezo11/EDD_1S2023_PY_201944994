package Utils

type NodeUser struct {
	user User
	next *NodeUser
	prev *NodeUser
}
