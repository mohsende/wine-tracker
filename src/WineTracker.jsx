import { useEffect, useState } from 'react';
import DatePicker from "react-multi-date-picker";
import { Calendar , DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";


export default function WineTracker() {
  const [value, setValue] = useState(new DateObject());
  const [note, setNote] = useState('');
  const [pics, setPics] = useState([]);
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('wineEntries');
    return saved ? JSON.parse(saved) : [];
  });

  // Save entries to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wineEntries', JSON.stringify(entries));
  }, [entries]);
  
  useEffect(() => {
    // console.log(date);
    // console.log(value.valueOf());
  
  }, [value]);
  
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const filePreviews = files.map(file => URL.createObjectURL(file));
    setPics(filePreviews);
  };

  const handleSave = () => {
    if (!note.trim()) return;

    const newEntry = {
      date: value.format(),
      note,
      pics: Object.fromEntries(pics.map((pic, i) => [i + 1, pic]))
    };
    const updatedEntries = [newEntry, ...entries].sort((a, b) => {
      const convertedaDate = new DateObject({ calendar: persian, locale: persian_fa, date: a.date, format: "YYYY/MM/DD" })
      const convertedbDate = new DateObject({ calendar: persian, locale: persian_fa, date: b.date, format: "YYYY/MM/DD" })
      return convertedbDate.valueOf() - convertedaDate.valueOf(); // جدیدتر بالا
    });

    setEntries(updatedEntries);
    setNote('');
    setPics([]);
  };

  const handleDelete = (index) => {
    if (!confirm('مایل به حذف این رکورد هستید؟')) return;
    const updated = [...entries];
    updated.splice(index, 1);
    setEntries(updated);
  };

  const handleDeletePic = (index) => {
    if (!confirm('مایل به حذف این عکس هستید؟')) return;
    const updated = [...pics];
    updated.splice(index, 1);
    setPics(updated);
  };

  return (
    <div className="p-4 mx-auto flex gap-2 flex-col justify-center-safe text-right">
      <h1 className="text-xl font-bold mb-4">Wine Tracker</h1>

      <div className="w-full">
        <label className="block ">تاریخ</label>
        {/* <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border border-blue-300 px-2 py-1" /> */}
        <DatePicker 
          value={value} 
          render={(value, openCalendar) => {
            return (
              <button className='px-2 py-1' onClick={openCalendar}>
                {value}
              </button>
            )
          }}
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
          onChange={setValue} />
      </div>

      <div className="">
        <label className="block text-right">توضیحات</label>
        <textarea dir='auto' value={note} onChange={(e) => setNote(e.target.value)} className="border border-blue-300 px-2 py-1 w-full h-20"></textarea>
      </div>

      <div className="flex flex-row-reverse gap-2 h-15 items-center">
          <input
          id="imageInput"
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <div className="flex gap-2">
          {pics.map((src, i) => (
            <img key={i} src={src} alt={`pic-${i}`} className="w-15 h-15 object-cover rounded shadow-md" onClick={() => handleDeletePic(i)} />
          ))}
        </div>
          <button
            type="button"
            onClick={() => document.getElementById('imageInput').click()}
            className="text-sm px-3 py-1 rounded-3xl w-10 h-10  "
          >
            +
          </button>
      </div>

      <button onClick={handleSave} className="bg-blue-600 text-white p-4 py-2 rounded">ذخیره</button>

      <hr className="my-4" />
      {/* لیست */}
      <div className='flex flex-col gap-2 mt-5'>
        {entries.map((entry, index) => (
          <div key={index} className="border border-blue-300 flex-col justify-items-center rounded-md p-2 mb-2 cursor-pointer" onClick={() => handleDelete(index)}>
            <div className=''>{entry.date}</div>
            <div className=''>{entry.note}</div>
            {entry.pics && Object.values(entry.pics).length > 0 && (
              <div className="flex gap-2 mt-2">
                {Object.values(entry.pics).map((src, i) => (
                  <img key={i} src={src} alt="pic" className="w-16 h-16 object-cover rounded" />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
