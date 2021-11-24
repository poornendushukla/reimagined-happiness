import './App.css';
import * as XLSX from 'xlsx';

function App() {
  const handleFileRead = (event)=>{
    const promise = new Promise((resolve,reject)=>{
      const reader = new FileReader();
      reader.readAsArrayBuffer(event.target.files[0]);
      reader.onload = (event)=>{
        const bufferArray = event.target.result;
        const workbook = XLSX.read(bufferArray,{type:"buffer"})
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName]
        const data = XLSX.utils.sheet_to_json(worksheet)
        resolve(data);
      }
      FileReader.onerror = (error)=>{
        reject(error);
      }
    });
    promise.then((d)=>{
      console.log(d)
    }) 
  }
  return (
    <div>
      <input type="file"
        onChange={e=>handleFileRead(e)}
        />
    </div>
  );
}

export default App;
