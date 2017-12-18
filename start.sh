#!/bin/sh
pm2 stop burger
pm2 delete burger
cd ~/burger
pm2 start --name "burger" node scripts/start.js