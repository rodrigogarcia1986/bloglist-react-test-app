const app = require('./app');
const { PORT } = require('./utils/config');
const { info } = require('./utils/logger.js');

app.listen(PORT, () => info(`Server running on Port ${PORT}`));