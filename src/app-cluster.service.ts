// src/app-cluster.service.ts
import { Injectable } from '@nestjs/common';
import * as os from 'os';
const cluster = require('cluster'); // nodejs의 cluster를 사용

const numCPUs = os.cpus().length; // 현재 os의 cpu갯수 확인

@Injectable()
export class AppClusterService {
  static clusterize(callback: Function): void {
    console.log('총 cpu갯수 : ', numCPUs);
    if (cluster.isMaster) {
      console.log(`Master server started on ${process.pid}`);
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
      cluster.on('exit', (worker, code, signal) => {
        // 워커가 죽을시
        console.log(`Worker ${worker.process.pid} died. Restarting`);
        cluster.fork(); // 워커 재시작
      });
    } else {
      console.log(`Cluster server started on ${process.pid}`);
      callback();
    }
  }
}
