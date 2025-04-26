interface Alert {
  level: 'info' | 'warning' | 'error' | 'critical';
  message: string;
  timestamp: string;
  service: string;
  details?: any;
}

interface Metric {
  name: string;
  value: number;
  timestamp: string;
  tags?: { [key: string]: string };
}

export class MonitoringService {
  private static instance: MonitoringService;
  private alerts: Alert[] = [];
  private metrics: Metric[] = [];
  private alertThresholds: { [key: string]: number } = {};
  private alertHandlers: ((alert: Alert) => void)[] = [];

  private constructor() {}

  public static getInstance(): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService();
    }
    return MonitoringService.instance;
  }

  public setAlertThreshold(metricName: string, threshold: number) {
    this.alertThresholds[metricName] = threshold;
  }

  public addAlertHandler(handler: (alert: Alert) => void) {
    this.alertHandlers.push(handler);
  }

  public recordMetric(metric: Metric) {
    this.metrics.push(metric);
    
    // Check if metric exceeds threshold
    const threshold = this.alertThresholds[metric.name];
    if (threshold !== undefined && metric.value > threshold) {
      this.triggerAlert({
        level: 'warning',
        message: `Metric ${metric.name} exceeded threshold of ${threshold}`,
        timestamp: new Date().toISOString(),
        service: metric.tags?.service || 'unknown',
        details: metric
      });
    }
  }

  public triggerAlert(alert: Alert) {
    this.alerts.push(alert);
    
    // Notify all alert handlers
    for (const handler of this.alertHandlers) {
      try {
        handler(alert);
      } catch (error) {
        console.error('Error in alert handler:', error);
      }
    }
  }

  public getAlerts(level?: Alert['level']): Alert[] {
    if (level) {
      return this.alerts.filter(alert => alert.level === level);
    }
    return this.alerts;
  }

  public getMetrics(name?: string): Metric[] {
    if (name) {
      return this.metrics.filter(metric => metric.name === name);
    }
    return this.metrics;
  }

  public clearAlerts() {
    this.alerts = [];
  }

  public clearMetrics() {
    this.metrics = [];
  }
}

export const monitoringService = MonitoringService.getInstance(); 