PROJECT_NAME=$1
if [ -z $PROJECT_NAME ]; then
  echo "No project name provided."; exit 1
fi;

mkdir -p $PROJECT_NAME

INDEX_FILE="$PROJECT_NAME/index.html"
JS_FILE="$PROJECT_NAME/calling.js"

cat << EOM > $INDEX_FILE
<!DOCTYPE html>
<html>
<body>
<h1>Hello, world</h1>
</body>
<script src="calling.js"></script>
</html> 
EOM

cat << EOM > $JS_FILE
function hello() {
  console.log("hello");
}
hello();
EOM

open $INDEX_FILE

