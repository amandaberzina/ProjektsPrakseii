
const supabaseUrl = '<https://btfuqkagvlhiarlwodin.supabase.co>';       
const supabaseAnonKey = '<eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0ZnVxa2FndmxoaWFybHdvZGluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MDEyNzMsImV4cCI6MjA3OTQ3NzI3M30.k6f6DxHUy7XD19SPrwXpcv-uRA0zAwKIqp8GrCnvXqU>';
const supabase = supabase.createClient(supabaseUrl, supabaseAnonKey);

async function loadTasks() {
  const { data, error } = await supabase.from('tasks').select('*');
  if (error) {
    console.error('Error loading tasks:', error);
    document.getElementById('tasks-table').innerHTML =
      `<tr><td colspan="99" style="color:red;">Error loading tasks</td></tr>`;
    return;
  }
  if (!data || data.length === 0) {
    document.getElementById('tasks-table').innerHTML =
      `<tr><td colspan="99">No tasks found.</td></tr>`;
    return;
  }

  const columns = Object.keys(data[0]);
  let htmlHead = '<tr>' + columns.map(col => `<th>${col}</th>`).join('') + '</tr>';

  let htmlRows = data.map(row =>
    '<tr>' + columns.map(col => `<td>${row[col]}</td>`).join('') + '</tr>'
  ).join('');
  document.getElementById('tasks-table').innerHTML = htmlHead + htmlRows;
}

window.addEventListener('DOMContentLoaded', loadTasks);
