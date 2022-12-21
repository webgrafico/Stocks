const parseEvent = (event) => {
  const response = JSON.parse(event.data);
  if (response.result !== false) {
    const eventName = JSON.parse(event.data).n;
    const data = JSON.parse(JSON.parse(event.data).o);
    return { data, eventName };
  }
  return { data: [], eventName: '' };
};

export default parseEvent;
