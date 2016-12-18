gulp prod --skip-update
passwd='Sunyujiang12=dd'
/usr/bin/expect <<-EOF
set timeout 60
spawn  scp -r ./dist/worker/\*  root@120.24.76.7:/data/app/public
expect "password:"
send "$passwd\r"
expect eof
EOF
