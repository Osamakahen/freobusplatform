import axios from 'axios';

interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  services: {
    [key: string]: {
      status: 'up' | 'down';
      responseTime: number;
      error?: string;
    };
  };
}

export class HealthCheckService {
  private static instance: HealthCheckService;
  private services: string[] = [];
  private checkInterval: number = 60000; // 1 minute

  private constructor() {}

  public static getInstance(): HealthCheckService {
    if (!HealthCheckService.instance) {
      HealthCheckService.instance = new HealthCheckService();
    }
    return HealthCheckService.instance;
  }

  public addService(url: string) {
    if (!this.services.includes(url)) {
      this.services.push(url);
    }
  }

  public setCheckInterval(interval: number) {
    this.checkInterval = interval;
  }

  public async checkHealth(): Promise<HealthCheckResult> {
    const result: HealthCheckResult = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {}
    };

    for (const service of this.services) {
      try {
        const startTime = Date.now();
        const response = await axios.get(`${service}/health`);
        const responseTime = Date.now() - startTime;

        result.services[service] = {
          status: response.status === 200 ? 'up' : 'down',
          responseTime
        };

        if (response.status !== 200) {
          result.status = 'degraded';
        }
      } catch (error) {
        result.services[service] = {
          status: 'down',
          responseTime: 0,
          error: error instanceof Error ? error.message : 'Unknown error'
        };
        result.status = 'unhealthy';
      }
    }

    return result;
  }

  public startMonitoring(callback: (result: HealthCheckResult) => void) {
    setInterval(async () => {
      const result = await this.checkHealth();
      callback(result);
    }, this.checkInterval);
  }
}

export const healthCheckService = HealthCheckService.getInstance(); 