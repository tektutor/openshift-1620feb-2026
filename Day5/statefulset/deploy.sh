echo -n "\nDeploying mysql primary master ...."
oc apply -f mysql-secret.yml --save-configs
oc apply -f mysql-primarymaster-service.yml --save-configs

echo -n "\nDeploying mysql replica slaves ..."
oc apply -f mysql-sfs1.yml --save-configs
oc apply -f mysql-sfs2.yml --save-configs
oc apply -f mysql-service.yml --save-configs
