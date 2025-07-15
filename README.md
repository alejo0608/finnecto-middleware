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

Se pueden incluir archivos `.json` con ejemplos

---

## 🔁 Ejecución rápida con `curl` (opcional)

```bash
curl -X POST http://localhost:3000/vendors \
  -H "Content-Type: application/json" \
  -d @test/sample_inputs/vendor_a_valid.json
```
---

## 👨‍💻 Autor

**Alejandro Cruz**  
Emprendedor | Ingeniero de Sistemas y Computación | Consultor de innovación  
📧 acruz@oficiencia.com 
🔗 [LinkedIn](https://linkedin.com/in/alejandrocruz)  
🌐 [Portafolio](https://alejandrocruz.dev)
📧 [CV](https://alejandrocruz.dev) *(si aplica)*

---

## 🙌 Agradecimientos

Gracias al equipo de **Finnecto** por esta oportunidad.  
Este reto fue una excelente experiencia para aplicar lógica de negocio real, buenas prácticas de integración y pensamiento modular.

---

## 🏁 Notas finales

✔️ Intenté desarrollar un código modular y mantenible  
✔️ Listo para producción con pequeña adaptación  
✔️ Compatible con pruebas automáticas y expansión futura  


