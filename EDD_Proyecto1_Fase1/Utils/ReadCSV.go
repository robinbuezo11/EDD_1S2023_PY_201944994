package Utils

import (
	"encoding/csv"
	"log"
	"os"
)

func ReadCVSFile(path string) [][]string {
	file, err := os.Open(path)
	if err != nil {
		log.Fatal("El archivo no existe "+path, err)
	}
	defer file.Close()

	reader := csv.NewReader(file)
	data, err := reader.ReadAll()

	if err != nil {
		log.Fatal("Error al intentar leer el archivo "+path, err)
	}

	return data
}
