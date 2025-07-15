# 🚀 Finnecto Middleware Challenge

Middleware desarrollado como parte de la prueba técnica para Finnecto.

Este servicio procesa datos de proveedores (`/vendors`) y facturas (`/invoices`) desde distintas compañías, aplica reglas de negocio específicas, transforma los datos y los almacena en un archivo de resultados.

---

👨‍💻 Desarrollado por: **Alejandro Cruz**  
🧪 Fecha: Julio 2025

## ⚙️ Instalación y ejecución

1. Clona el repositorio:

```bash
git clone https://github.com/alejo0608/finnecto-middleware.git
cd finnecto-middleware
```

2. Instala las dependencias:

```bash
npm install
```

3. Ejecuta el servidor en modo desarrollo:

```bash
npm run dev
```

> El servidor iniciará en:
> `http://localhost:3000`


## 🧱 Estructura del Proyecto

```
finnecto-middleware/
├── src/
│   ├── app.js                # Servidor principal
│   ├── routes/
│   │   ├── vendors.js        # Endpoint POST /vendors
│   │   └── invoices.js       # Endpoint POST /invoices
│   ├── services/
│   │   ├── vendorService.js  # Lógica de negocio para vendors
│   │   └── invoiceService.js # Lógica de negocio para invoices
│   ├── utils/
│   │   └── fileWriter.js     # Escritura de resultados al archivo
├── results/
│   └── results.jsonl         # Archivo de resultados (JSON por línea)
├── test/
│   └── sample_inputs/        # Datos de prueba
├── package.json
└── README.md
```

---

## 🧰 Tecnologías Usadas

- **Node.js** – Motor de ejecución
- **Express** – Framework web para montar los endpoints
- **Nodemon** – Reinicio automático en desarrollo
- **fs / path (Node.js)** – Manejo de archivos
- **Postman** (externo) – Para pruebas manuales

---

## 📮 Endpoint: POST /vendors

Procesa datos de proveedores según la compañía (A o B) y transforma la respuesta con reglas de negocio específicas.

### 🧠 Lógica de negocio aplicada

#### Para `company: "A"`
- Si el país del proveedor (`country`) **no es "US"**, se añade:
  ```json
  "internationalBank": "Please confirm international bank details"
    ```
#### Para company: "B" y country: "US"
- Si falta registrationNumber o taxId → se añade:
  ```json
  "vendorStatus": "Incomplete - missing registration/tax details"
  ```

- Si ambos están presentes:

  ```json
  "vendorStatus": "Verified"
  ```

### 📥 Ejemplo de entrada (Company A – proveedor internacional)

``` json
{
  "company": "A",
  "vendorName": "Global Supplies Ltd.",
  "country": "FR",
  "bank": "Bank X"
}
```
### 📤 Respuesta esperada

``` json
{
  "vendorName": "Global Supplies Ltd.",
  "country": "FR",
  "bank": "Bank X",
  "internationalBank": "Please confirm international bank details"
}
```

---

### 📝 Contenido para `/invoices`

## 📮 Endpoint: POST /invoices

Transforma una factura con base en el contenido de sus líneas de productos y la compañía que la envía.

### 🧠 Lógica de negocio aplicada

#### Para `company: "A"`

- Si **alguna línea** contiene `"alcohol"` → `"account": "ALC-001"`
- Si **ninguna línea** contiene `"alcohol"` → `"account": "STD-001"`

#### Para `company: "B"`

- Si hay `"alcohol"` y `"tobacco"` → `"account": "MULTI-B"`
- Si solo `"alcohol"` → `"account": "ALC-B"`
- Si solo `"tobacco"` → `"account": "TOB-B"`
- Si ninguno → `"account": "STD-B"`

---

### 📥 Ejemplo de entrada (Company B – alcohol y tobacco)

```json
{
  "company": "B",
  "invoiceId": "INV2003",
  "invoiceDate": "2025-03-19",
  "lines": [
    { "description": "Alcohol beverages", "amount": 150.00 },
    { "description": "Tobacco products", "amount": 200.00 }
  ]
}
```
### 📤 Respuesta esperada

``` json
{
  "invoiceId": "INV2003",
  "invoiceDate": "2025-03-19",
  "account": "MULTI-B",
  "lines": [
    { "description": "Alcohol beverages", "amount": 150.00 },
    { "description": "Tobacco products", "amount": 200.00 }
  ]
}
```
## 🗃️ Resultados almacenados

Todos los datos transformados exitosamente se guardan automáticamente en el archivo:

> results/results.jsonl


📌 Formato: **JSON line-by-line**  

Cada línea contiene un objeto JSON independiente, lo que permite fácil lectura, streaming o importación a bases de datos.

### 📌 Ejemplo del contenido de `results.jsonl`:

``` json
{"vendorName":"Global Supplies Ltd.","country":"FR","bank":"Bank X","internationalBank":"Please confirm international bank details"}
{"invoiceId":"INV2003","invoiceDate":"2025-03-19","account":"MULTI-B","lines":[{"description":"Alcohol beverages","amount":150},{"description":"Tobacco products","amount":200}]}
```

---

## ❌ Manejo de errores

Si la solicitud no contiene los campos requeridos o tiene un formato inválido, el middleware responde con un **código 400** y un mensaje descriptivo.

### 🧪 Ejemplo de respuesta con error:

```json
{
  "error": "Missing required fields: company, invoiceId, invoiceDate, or lines"
}
``` 
> Los registros que generen error no se guardan en el archivo de resultados.

## 🧪 Datos de prueba

En la carpeta:

> test/sample_inputs/

Se incluyen archivos `.json` con ejemplos

Esto facilita validar el comportamiento del middleware sin necesidad de reescribir los datos.

Archivos incluidos:

- vendor_a_international.json

- vendor_b_incomplete.json

- vendor_b_verified.json

- invoice_a_with_alcohol.json

- invoice_b_multi.json

- invoice_b_std.json

### 🧪 ¿Cómo usarlos los datos de prueba con curl?

#### ▶️ Opción 1: PowerShell (Windows)

Ejecuta todos los casos con:

``` powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
./test/run-tests.ps1
```
Este script enviará las solicitudes automáticamente a los endpoints /vendors y /invoices con diferentes combinaciones de datos para verificar el comportamiento del middleware.

#### ▶️ Opción 2: Git Bash o Linux
Si usas Git Bash o un sistema Unix-like:

```bash
chmod +x test/run-tests.sh
./test/run-tests.sh
```
Este script hace lo mismo que el de PowerShell pero con sintaxis tradicional de bash.

Para probar un archivo vendor individualmente:

``` bash
curl -X POST http://localhost:3000/vendors \
  -H "Content-Type: application/json" \
  -d @test/sample_inputs/vendor_a_international.json
```

Para probar un archivo invoices individualmente:
``` bash
curl -X POST http://localhost:3000/invoices \
  -H "Content-Type: application/json" \
  -d @test/sample_inputs/invoice_b_multi.json
```

---

## 🔁 Ejecución rápida con `curl`

```bash
curl -X POST http://localhost:3000/vendors \
  -H "Content-Type: application/json" \
  -d @test/sample_inputs/vendor_b_verified.json
```
---
## 🖥️ Frontend de Prueba (Middleware Tester)
Este proyecto incluye una pequeña interfaz web para probar de manera visual los endpoints /vendors e /invoices.

### ✨ Características
- Diseño limpio y minimalista.

- Validación automática del JSON antes de enviar.

- Muestra respuestas formateadas.

- Indica errores si el JSON es inválido o falta información.

- Soporta pruebas locales contra http://localhost:3000.

### 📷 Vista previa

<img src="https://raw.githubusercontent.com/alejo0608/finnecto-middleware/main/assets/finnecto-preview.png" alt="Finnecto Middleware Tester" width="700">



### 🚀 Cómo usarlo
1. Asegúrate de tener el servidor corriendo con cualquiera de los siguientes 2 comandos:

```bash
npm start
```
```bash
npm run dev
```
2. Abre el archivo frontend.html directamente en tu navegador (doble clic o abrir con Chrome).

3. Prueba los endpoints copiando tus datos JSON en cada text area.

<img src="https://raw.githubusercontent.com/alejo0608/finnecto-middleware/main/assets/texto.png" alt="Finnecto Middleware Tester Text" width="700">

4. Haz clic en “Enviar a /vendors” o “Enviar a /invoices”. 

<img src="https://raw.githubusercontent.com/alejo0608/finnecto-middleware/main/assets/boton.png" alt="Finnecto Middleware Tester Button" width="700">

Posteriormente te aparecerá un dialogo de refresh al cual le debes dar click en "cancelar"

<img src="https://raw.githubusercontent.com/alejo0608/finnecto-middleware/main/assets/dialogo.png" alt="Finnecto Middleware Tester Dialog" width="700">

5. La respuesta aparecerá abajo formateada, junto con estados de validación.

<img src="https://raw.githubusercontent.com/alejo0608/finnecto-middleware/main/assets/resultado.png" alt="Finnecto Middleware Tester Result" width="700">

### 💡 Ejemplo de entrada válida para Vendors:

```json
{
  "company": "A",
  "vendorName": "Tech Supplies Inc.",
  "country": "FR",
  "bank": "International Bank"
}
```
---

## 👨‍💻 Autor

**Alejandro Cruz**  
Emprendedor | Ingeniero de Sistemas y Computación | Consultor de innovación  
📧 acruz@oficiencia.com 
🔗 [LinkedIn](https://linkedin.com/in/alejandrocruzacevedo)

🌐 [Portafolio](./docs/CV.pdf)

📧 [CV](./docs/CV.pdf)

---

## 🙌 Agradecimientos

Gracias al equipo de **Finnecto** por esta oportunidad.  
Este reto fue una excelente experiencia para aplicar lógica de negocio real, buenas prácticas de integración y pensamiento modular.

---

## 🏁 Notas finales

✔️ Intenté desarrollar un código modular y mantenible  
✔️ Listo para producción con pequeña adaptación  
✔️ Compatible con pruebas automáticas y expansión futura  


