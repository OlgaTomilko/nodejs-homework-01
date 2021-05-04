import fs from "fs";
import path from "path";

const contactsPath = path.join("./db", "contacts.json");

function listContacts(msg) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.error(err.message);
      return;
    }
    console.table(JSON.parse(data));
  });
  // console.log(msg);
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.error(err.message);
      return;
    }
    const parsedContacts = JSON.parse(data);
    const contact = parsedContacts.filter(
      ({ id }) => id.toString() === contactId
    );
    console.table(contact);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.error(err.message);
      return;
    }
    const parsedContacts = JSON.parse(data);
    const filteredContacts = parsedContacts.filter(
      ({ id }) => id.toString() !== contactId
    );

    const content = JSON.stringify(filteredContacts);
    fs.writeFile(contactsPath, content, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
    console.table(filteredContacts);
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.error(err.message);
      return;
    }
    const parsedContacts = JSON.parse(data);
    let ids = [];
    parsedContacts.map(({ id }) => {
      ids.push(id);
    });
    const newContact = {
      id: Math.max(...ids) + 1,
      name,
      email,
      phone: phone.toString(),
    };
    parsedContacts.push(newContact);
    const content = JSON.stringify(parsedContacts);
    fs.writeFile(contactsPath, content, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
    console.table(parsedContacts);
  });
}

export { listContacts, getContactById, removeContact, addContact };
// module.exports = { listContacts, getContactById, removeContact, addContact };
