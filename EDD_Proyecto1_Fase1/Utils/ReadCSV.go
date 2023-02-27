package Utils

import (
	"encoding/csv"
	"fmt"
	"os"
)

func ReadCVSFile(path string) [][]string {
	file, err := os.Open(path)
	if err != nil {
		fmt.Println("El archivo no existe "+path, err)
		return nil
	} else {
		defer file.Close()

		reader := csv.NewReader(file)
		data, err := reader.ReadAll()

		if err != nil {
			fmt.Println("Error al intentar leer el archivo "+path, err)
			return nil
		} else {
			return data
		}
	}
}
