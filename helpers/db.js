const db = {
  issues: [
    { uuid: '3e29dcd4-a754-4d88-a631-83324f401825',
      title: 'Issue1',
      customerUuid: 'c1',
    },
    { uuid: 'a877f648-ff54-4076-b56d-40a1e40dccd3',
      title: 'Issue2',
      customerUuid: 'c2',
    }
  ],
  messages: [

  ],
  customers: [
    {
      uuid: 'c1',
      email: 'cutomer1@customer.com',
      password: 'password1',
      auth_token: 'customer_token_1',
      name: 'customer1',
    },
    {
      uuid: 'c2',
      email: 'cutomer2@customer.com',
      password: 'password2',
      auth_token: 'customer_token_2',
      name: 'customer2',
    }
  ],
  admins: [
    {
      uuid: 'a1',
      email: 'admin1@admin.com',
      password: 'password1',
      auth_token: 'admin_token_1',
      name: 'admin1',
    },
    {
      uuid: 'a2',
      email: 'admin2@admin.com',
      password: 'password2',
      auth_token: 'admin_token_2',
      name: 'admin2',
    }
  ],
  getById(entity, uuid) {
    return this[entity].find(e => e.uuid === uuid);
  },
  getSubset(entity, uuid, user, size) {
    return this[entity];
  },
  getIssues(user, uuid, limit = 30) {
    const issues = this.issues.filter(issue => user.role === 'admin' || issue.customerUuid === user.uuid);

    if (!uuid) {
      return issues.slice(-limit);
    }

    const index = issues.findIndex((issue, index) => issue.uuid == uuid) + 1;
    const start = (index - limit) > 0 ? (index - limit) : 0;
    return issues.slice(start, index - 1);
  },
  getIssue(user, uuid) {
    return this.issues.find(issue => issue.uuid === uuid && (user.role === 'admin' || issue.customerUuid === user.uuid));
  },
  getMessages(issueUuid, uuid, limit){
    const messages = this.messages.filter(message => message.issueUuid === issueUuid);

    if (!uuid) {
      return messages.slice(-limit);
    }

    const index = messages.findIndex((message, index) => message.uuid == uuid) + 1;
    const start = (index - limit) > 0 ? (index - limit) : 0;
    return messages.slice(start, index - 1);
  },
  getByAuthToken(auth_token) {
    const admin = this.admins.find(admin => admin.auth_token === auth_token);
    const customer = this.customers.find(customer => customer.auth_token === auth_token);

    return admin ? { ...admin, role: 'admin' } : { ...customer, role: 'customer' };
  },
  getUserByUuid(uuid){
    const admin = this.admins.find(admin => admin.uuid === uuid);
    const customer = this.customers.find(customer => customer.uuid === uuid);
    return admin ? { ...admin, role: 'admin' } : { ...customer, role: 'customer' };
  },
};

let j = 0;
for(let i = 0; i < 100; i++) {

  db.messages.push({
    uuid: j++,
    userUuid: db.issues[0].customerUuid,
    text: `Question ${i}`,
    issueUuid: db.issues[0].uuid
  });
  db.messages.push({
    uuid: j++,
    userUuid: db.admins[0].uuid,
    text: `Response ${i}`,
    issueUuid: db.issues[0].uuid
  });
}

for(let i = 0; i < 100; i++) {
  db.messages.push({
    uuid: j++,
    userUuid: db.issues[1].customerUuid,
    text: `Question ${100 + i}`,
    issueUuid: db.issues[1].uuid
  });
  db.messages.push({
    uuid: j++,
    userUuid: db.admins[1].uuid,
    text: `Response ${100 + i}`,
    issueUuid: db.issues[1].uuid
  });
}

export default db;
