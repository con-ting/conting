import random
from locust import task, FastHttpUser, stats

stats.PERCENTILES_TO_CHART = [0.95, 0.99]

class CouponIssueV1(FastHttpUser):
    connection_timeout = 10.0
    network_timeout = 10.0

    @task
    def issue(self):
        schedule_id = 1  # 스케줄 ID를 지정하거나 필요에 따라 동적으로 할당합니다.
        payload = {
            "schedule_id": schedule_id
        }
        headers = {
            "X-Authorization-Id": str(random.randint(2, 10000000))
        }
        with self.client.post("/queue", json=payload, headers=headers):
            pass