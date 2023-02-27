package Utils

type NodeUser struct {
	User     *User
	Next     *NodeUser
	Prev     *NodeUser
	Binnacle *StackBinnacle
}
