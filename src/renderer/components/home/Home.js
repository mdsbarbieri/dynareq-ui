import _ from "lodash";
import dynReq from 'dynamo-request'; 
export default {
    name: 'home-component',
    store: ['global', 'request', 'environments', 'actions'],
    watch: {
        'request.environment.id': 'setEnvironment',
    },
    data (){
        return {
            selectedEnv : {},
            selectedAction : {},
            logs : [],
            serverTotal : 0,
            serverDone: 0
        }
    },
    computed:{
        progressPercent(){
            if(this.serverTotal == 0){
                return 0;
            }
            return (this.serverDone * 100) / this.serverTotal;
        }
    },
    created(){
        console.log(dynReq);
    },
    methods: {
        setEnvironment() {
            this.$store.environments.forEach((env, idx, elem) => {
                if (_.isEqual(env.id, this.request.environment.id)) {
                    this.request.environment.isProduction = env.isProduction
                    this.$forceUpdate();
                }
            })
        },
        makeRequest(){
            if(!this.selectedAction || !this.selectedEnv){
                return;
            }

            console.log(this.selectedAction);
            console.log(this.selectedEnv);

            
            const requestData = Object.assign({}, this.selectedAction);
            const requestServer =  this.selectedEnv.hosts.slice();
            const auth = this.selectedEnv.user + ':' + this.selectedEnv.password;
            
            this.logs.push({
                message: `Execute action ${requestData.name} in environment ${this.selectedEnv.name}`
            });
            //progress bar
            this.serverTotal = requestServer.length;
            this.serverDone = 0;
            let vm = this;
            const useMethod = requestData.type === 'setValue' ? 'updateProperty' : 'invokeMethod';
            requestServer.forEach( server => {
                let finalHost = (server.ip.startsWith('http')? '': 'http://') + server.ip;
                dynReq[useMethod](finalHost, requestData, auth, (error, requestData) => {
                    let log = {
                        message : requestData.host,
                        withStatus : true
                    }
                    console.log('Request data', requestData);
                    if(error){
                        console.log('Error on execute operation', error);
                        log.error = error.message;
                    }else{
                    }
                    vm.logs.push(log);
                    vm.serverDone++;
                });
            });


        }
    }
}