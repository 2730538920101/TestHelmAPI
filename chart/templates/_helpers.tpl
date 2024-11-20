{{- define "helm-test.labels" -}}
app.kubernetes.io/name: {{ .Chart.Name }}
app.kubernetes.io/version: {{ .Chart.Version }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{- define "helm-test.resources" -}}
resources:
  requests:
    memory: "{{ .Values.resources.requests.memory }}"
    cpu: "{{ .Values.resources.requests.cpu }}"
  limits:
    memory: "{{ .Values.resources.limits.memory }}"
    cpu: "{{ .Values.resources.limits.cpu }}"
{{- end }}