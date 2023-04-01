let key = 2;

const tickets = [
  {
    id: 1,
    status: -1,
    full: -1,
    name: 'Отменить отправку пустой формы?',
    description: 'Решил не отменять.\r\nПользователь может захотеть создать анонимную заметку.\nПример: написанный крестик на руке, сам знаешь и ладно.',
    created: 1680076710591,
  },
];

function addingTicket(status, full, name, description, created) {
  try {
    const id = key;
    const obj = { id, status, full, name, description, created };
    tickets.push(obj);
    key += 1;
    return true;
  } catch (error) {
    console.log('addingTicket: ', error);
    return false;
  }
}

function allTickets() {
  return tickets;
}

function statusСhange(id) {
  let mark = false;
  tickets.forEach((obj) => {
    if (Number(obj.id) === Number(id)) {
      let stat = Number(obj.status);
      stat = -stat;
      obj.status = stat;
      mark = true;
    }
  });
  return mark;
}

function changeFull(id) {
  let mark = false;
  tickets.forEach((obj) => {
    if (Number(obj.id) === Number(id)) {
      let stat = Number(obj.full);
      stat = -stat;
      obj.full = stat;
      mark = true;
    }
  });
  return mark;
}

function changeTicket(id, name, description, created) {
  let mark = false;
  tickets.forEach((obj) => {
    if (Number(obj.id) === Number(id)) {
      obj.name = name;
      obj.description = description;
      obj.created = created;
      mark = true;
    }
  });
  return mark;
}

function delTicket(id) {
  let mark;
  tickets.forEach((obj, index) => {
    if (Number(obj.id) === Number(id)) {
      mark = index;
    }
  });
  if (mark !== undefined) {
    tickets.splice(mark, 1);
    return true;
  }
  return false;
}

module.exports = {
  addingTicket,
  allTickets,
  statusСhange,
  delTicket,
  changeFull,
  changeTicket,
};
