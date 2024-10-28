#!/bin/bash

set -e

wait-for-it db:5432

npx sequelize-cli db:migrate

exec npm start
